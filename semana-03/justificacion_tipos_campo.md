# Justificación de tipos de campo – App `quiz` (GLAB-S03)

Documento de soporte para el entregable del laboratorio GLAB-S03
("Creación de Modelos en Django"). Curso: Desarrollo de Aplicaciones Empresariales.

Se justifica la elección del tipo de campo para al menos 3 atributos de cada
uno de los tres modelos.

---

## Modelo `Exam`

| Atributo         | Tipo de campo            | Justificación |
|------------------|--------------------------|---------------|
| `title`          | `CharField(max_length=200)` | El título de un examen es un texto corto (una línea), no requiere texto multilínea. `CharField` lo limita a `max_length` (200 caracteres), lo que permite validación de longitud tanto a nivel de aplicación como de base de datos (`varchar(200)` en SQLite), y en formularios se renderiza como un `<input type="text">` simple. |
| `description`    | `TextField(blank=True)`  | La descripción puede ser larga (varias líneas/párrafos), por lo que el espacio debe ser "ilimitado". `TextField` mapea a tipo `TEXT` en SQLite (sin límite práctico de tamaño) y se renderiza como `<textarea>` en los formularios. Además `blank=True` la hace opcional a nivel de validación de formularios. |
| `created_at`     | `DateTimeField(auto_now_add=True)` | Registra la fecha y hora exactas de alta del registro. `auto_now_add=True` asigna por sí solo el instante actual al momento de la creación, evita que se modifique en guardados posteriores y elimina la necesidad de setearlo manualmente en el código. Se eligió `DateTimeField` (no `DateField`) para conservar también la hora. |

---

## Modelo `Question`

| Atributo         | Tipo de campo            | Justificación |
|------------------|--------------------------|---------------|
| `text`           | `TextField`              | El enunciado de una pregunta puede ser extenso y contener varios renglones. `TextField` no impone límite de longitud (tipo `TEXT` en SQLite) y genera un `<textarea>` en formularios, adecuado para redactar preguntas complejas. |
| `exam`           | `ForeignKey(Exam, on_delete=models.CASCADE, related_name='questions')` | Expresa la relación N:1 entre preguntas y exámenes (una pregunta pertenece a un examen; un examen tiene muchas preguntas). `on_delete=CASCADE` garantiza la integridad referencial borrando las preguntas si se elimina su examen (nunca quedan preguntas huérfanas). `related_name` permite la consulta inversa `exam.questions`. |
| `score`          | `IntegerField(default=1)` | El puntaje de una pregunta es un valor numérico entero (puntos por respuesta correcta), por lo que un entero es el tipo más eficiente y correcto. `default=1` hace la migración no destructiva: las filas existentes reciben el valor por defecto sin intervención del usuario y el campo queda pre-rellenado al crear preguntas nuevas. |

---

## Modelo `Choice`

| Atributo         | Tipo de campo            | Justificación |
|------------------|--------------------------|---------------|
| `text`           | `CharField(max_length=300)` | El texto de una opción suele ser breve (una frase corta). `CharField` con `max_length=300` limita el tamaño, genera `varchar(300)` en SQLite y un `<input type="text">` en formularios, evitando entradas desmedidas. |
| `is_correct`     | `BooleanField(default=False)` | Indica si la opción es la respuesta correcta: un dato binario verdadero/falso, que es exactamente lo que modela `BooleanField` (columna `bool` en SQLite, checkbox en formularios y admin). `default=False` evita errores de lógica ya que la mayoría de opciones no son la correcta. |
| `question`       | `ForeignKey(Question, on_delete=models.CASCADE, related_name='choices')` | Relación N:1 entre opciones y preguntas (una opción pertenece a una pregunta; una pregunta tiene 4 opciones típicamente). `on_delete=CASCADE` elimina las opciones cuando se borra la pregunta, preservando integridad referencial; `related_name='choices'` habilita la consulta `question.choices.all()`. |

---

## Notas generales

- **Identificadores**: Django genera por defecto `BigAutoField` como PK en
  cada modelo (tipo `integer`/`bigint` autoincremental), usada como clave
  foránea en las relaciones `N:1`.
- **Clave foránea de Question -> Exam**: `exam_id` (tipo `bigint`).
- **Clave foránea de Choice -> Question**: `question_id` (tipo `bigint`).
- La elección de "longitud acotada" vs. "sin límite" responde a la naturaleza
  del dato: identificadores y textos breves con `CharField`, contenido extenso
  o libre con `TextField`.