# LABORATORIO_04 - Relaciones entre modelos en Django

Laboratorio 04 de **Desarrollo de Aplicaciones Empresariales**: relaciones entre
modelos de Django (`ForeignKey`, `OneToOneField`, `ManyToManyField` y modelo
intermedio con `through`) sobre un catálogo de libros.

## Cómo levantar el proyecto

Requisitos: **Python 3.10+** y **pip** instalados.

1. Crear y activar un entorno virtual.

   ```bash
   python -m venv venv
   # Windows
   venv\Scripts\activate
   # Linux / macOS
   source venv/bin/activate
   ```

2. Instalar las dependencias.

   ```bash
   pip install -r requirements.txt
   ```

   (Incluye Django y Pillow, necesario para el campo `ImageField`.)

3. Aplicar las migraciones (crea `db.sqlite3`).

   ```bash
   python manage.py migrate
   ```

4. (Opcional) Cargar los datos de prueba.

   ```bash
   python manage.py loaddata sample_data
   ```

5. Crear un superusuario para el admin.

   ```bash
   python manage.py createsuperuser
   ```

6. Correr el servidor de desarrollo.

   ```bash
   python manage.py runserver
   ```

   - Admin: http://127.0.0.1:8000/admin/
   - Detalle de libro de ejemplo: http://127.0.0.1:8000/books/1/

## Resumen de lo realizado por paso

1. **Proyecto Django** creado en `LABORATORIO_04` (proyecto `config`, app
   `library`). Se añadió `library` a `INSTALLED_APPS`. Pillow quedó en
   `requirements.txt`.

2. **Archivos de medios**: `MEDIA_URL = '/media/'`, `MEDIA_ROOT = BASE_DIR /
   'media'` en `settings.py`, y la ruta `static(settings.MEDIA_URL,
   document_root=settings.MEDIA_ROOT)` añadida en `config/urls.py` solo en
   `DEBUG`.

3. **Modelos**: `Author`, `Book`, `Publisher` y `Category` en
   `library/models.py`, cada uno con campos propios, `class Meta` y `__str__`.

4. **ForeignKey** `Book.author -> Author` con `on_delete=models.CASCADE`
   (justificado en un comentario del código) y `related_name="books"`.

5. **OneToOneField**: `AuthorProfile` ligado a `Author` con datos biográficos
   (`bio`, `birth_date`, `nationality`, `photo`).

6. **ManyToManyField**: `Book.categories` hacia `Category`, y `Book.publishers`
   hacia `Publisher` a través del modelo intermedio `Publication` (con
   `through`) que guarda `publication_date` y `edition`.

7. **Migraciones**: `makemigrations` y `migrate` aplicados. Tablas creadas:

   | Tabla                   | Origen                                                   |
   |-------------------------|----------------------------------------------------------|
   | `library_author`        | modelo `Author`                                          |
   | `library_book`          | modelo `Book`                                            |
   | `library_publisher`     | modelo `Publisher`                                       |
   | `library_category`      | modelo `Category`                                        |
   | `library_authorprofile` | modelo `AuthorProfile` (`OneToOneField`)                 |
   | `library_book_categories` | tabla M2M intermedia `Book <-> Category`               |
   | `library_publication`   | **tabla intermedia** de `Book -> Publisher` con `through` (columnas `book_id`, `publisher_id`, `publication_date`, `edition`) |

8. **Admin y datos de prueba**: modelos registrados en `library/admin.py`
   (con inlines para `AuthorProfile` y `Publication`). Datos cargados desde el
   fixture `library/fixtures/sample_data.json`: 2 autores, 4 libros, 3
   categorías y 2 editoriales. "The Silent Forest" pertenece a dos categorías
   (Fiction y Science). La foto del perfil de Alice Morgan está en `media/authors/`.

9. **Consultas en shell** (resultados en `queries.md`):
   - Ida: `book.author`
   - Vuelta: `author.books.all()`
   - Filtrado con `__`: `Book.objects.filter(category__name="Science")`

10. **Prueba de `on_delete`** (resultados en `on_delete_tests.md`): con
    `CASCADE` el borrado del autor elimina también sus libros; con un
    cambio temporal a `PROTECT` Django lanza `ProtectedError` y no borra nada.
    Se restauró `CASCADE` al final.

11. **Detalle de libro**: plantilla `book_detail.html` que muestra categorías
    (M2M), editorial y edición (a través de `Publication`) y los datos del
    autor con su perfil (`book.author.profile`). Vista `book_detail` y URL
    `books/<int:book_id>/`. Comprobado en el navegador.

> Se omitió el paso 12 (subida a GitHub / campus) y la rúbrica.

## Estructura del proyecto

```
LABORATORIO_04/
├── config/            # settings, urls globales, wsgi/asgi
├── library/           # app principal (models, admin, views, templates)
│   ├── fixtures/sample_data.json
│   ├── migrations/
│   └── templates/library/book_detail.html
├── media/authors/     # imágenes subidas (foto de perfil de ejemplo)
├── db.sqlite3
├── manage.py
├── requirements.txt
├── queries.md
└── on_delete_tests.md
```