# Prueba de comportamiento de `on_delete` en la ForeignKey Book.author

Campo declarado en `library/models.py`:

```python
author = models.ForeignKey(
    Author,
    on_delete=models.CASCADE,
    related_name="books",
)
```

> Nota: `on_delete` sí forma parte del estado de las migraciones (Django lo
> incluye en el `deconstruct()` del campo), por lo que cambiarlo entre
> `CASCADE` y `PROTECT` **sí genera una migración nueva** (`makemigrations`
> crea un `AlterField`). En esta prueba ese cambio se hizo solo para
> observar el comportamiento en tiempo de ejecución y se revirtió después
> sin dejar la migración aplicada.

## 1) Comportamiento con `on_delete=CASCADE` (configuración final elegida)

Al borrar un autor que tiene libros asociados, `a.delete()` elimina el autor
**y todos sus libros en cascada**, así como los
`Publication` y perfiles dependientes. El motivo de elegir `CASCADE`: un libro
sin su autor pierde el dato principal de su entidad; además el libro "hereda"
la vida del autor dentro del catálogo. Se consideró `SET_NULL` pero el libro no
debe quedar huérfano en un catálogo.

Ejecución:

```python
from library.models import Author, Book

a = Author.objects.create(first_name="Temp", last_name="DeleteMe")
Book.objects.create(title="TEMP BOOK", author=a)
a.delete()
Book.objects.filter(title="TEMP BOOK").count()
```

Salida registrada:

```
on_delete=CASCADE  |  deleting an author who owns books
Created author: Temp DeleteMe | books owned: 1
Calling author.delete() ...
Tuple returned by delete(): (2, {'library.Book': 1, 'library.Author': 1})
Books 'TEMP BOOK' remaining in DB: 0
```

**Conclusión:** con `CASCADE` el borrado del autor arrastra y elimina sus
libros (el contador de objetos borrados devuelve `{library.Book: 1,
library.Author: 1}`).

## 2) Cambio temporal a `on_delete=PROTECT`

Se cambió temporalmente `models.py`:

```python
author = models.ForeignKey(
    Author,
    on_delete=models.PROTECT,
    related_name="books",
)
```

Y se reintentó el mismo escenario de borrado:

```python
from django.db.models import ProtectedError
from library.models import Author, Book

a = Author.objects.create(first_name="Temp", last_name="ProtectMe")
Book.objects.create(title="TEMP BOOK 2", author=a)
try:
    a.delete()
except ProtectedError as exc:
    print("Protected objects:", list(exc.protected_objects))
```

Salida registrada:

```
on_delete=PROTECT  |  trying to delete an author who owns books
Created author: Temp ProtectMe | books owned: 1
ProtectedError RAISED -> the author cannot be deleted
Protected objects: [<Book: TEMP BOOK 2>]
Author still exists: True
Book still exists: True
```

**Conclusión:** con `PROTECT` Django lanza `django.db.models.ProtectedError` e
impide el borrado del autor mientras existan libros relacionados. Ningún
registro se elimina.

## 3) Diferencia de comportamiento y restauración

| Opción      | Borrar autor con libros | Resultado                                                                 |
|-------------|-------------------------|---------------------------------------------------------------------------|
| `CASCADE`   | Permitido               | El autor y sus libros se eliminan en cascada.                             |
| `PROTECT`   | Bloqueado               | `ProtectedError`, no se borra nada hasta eliminar o desvincular los libros. |

Al terminar la prueba se restauró `on_delete=models.CASCADE` en
`library/models.py`, de modo que el proyecto queda con la configuración final
del paso 4.