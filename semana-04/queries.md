# Consultas del Laboratorio 04 - Relaciones entre modelos

Registro de las consultas ejecutadas desde la consola interactiva de Django
(`manage.py shell`) con los datos de prueba de `library/fixtures/sample_data.json`.

## 1. Consulta de ida (forward lookup): `book.author`

Trae el autor asociado a un libro a través de la `ForeignKey`.

```python
from library.models import Book

book = Book.objects.get(title="The Silent Forest")
print("book.author ->", book.author)
```

**Resultado:**

```
Selected book: The Silent Forest
book.author  -> Alice Morgan
```

## 2. Consulta de vuelta (reverse lookup): `author.books.all()`

Recorre la relación en sentido inverso usando el `related_name="books"`.

```python
from library.models import Author

author = Author.objects.get(first_name="Alice", last_name="Morgan")
print("author.books.all() ->")
for b in author.books.all():
    print("   -", b)
```

**Resultado:**

```
Selected author: Alice Morgan
author.books.all() ->
   - The Quantum Garden
   - The Silent Forest
```

## 3. Consulta con filtrado por doble guion bajo (`__`)

Filtra viajando por la relación `ManyToManyField` `Book.categories` hasta el
campo `name` de `Category`.

```python
from library.models import Book

qs = Book.objects.filter(categories__name="Science")
print("Book.objects.filter(categories__name='Science') ->")
for b in qs:
    print("   -", b)
print("Count:", qs.count())
```

**Resultado:**

```
Book.objects.filter(categories__name='Science') ->
   - The Silent Forest
   - The Quantum Garden
   - Programming in Python
Count: 3
```

El libro "The Silent Forest" pertenece a dos categorías (Fiction y Science),
por lo que también aparece en las consultas relacionadas con `ManyToManyField`.