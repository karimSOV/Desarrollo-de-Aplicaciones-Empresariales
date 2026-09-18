from django.db import models
from django.utils import timezone


class Author(models.Model):
    """Author entity for the book catalog."""

    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    email = models.EmailField(blank=True)

    class Meta:
        ordering = ["last_name", "first_name"]

    def __str__(self):
        return f"{self.first_name} {self.last_name}"


class Book(models.Model):
    """Book entity for the catalog."""

    title = models.CharField(max_length=200)
    isbn = models.CharField(max_length=13, unique=True, blank=True)
    publication_year = models.PositiveIntegerField(null=True, blank=True)
    price = models.DecimalField(max_digits=8, decimal_places=2, default=0)

    # ForeignKey: many books belong to one author.
    # CASCADE is used because when an author is deleted, their books are no
    # longer useful and must be removed as well (dependent records).
    author = models.ForeignKey(
        Author,
        on_delete=models.CASCADE,
        related_name="books",
    )

    # ManyToManyField without an intermediate model.
    categories = models.ManyToManyField("Category", related_name="books")

    # ManyToManyField with a custom intermediate model (through).
    publishers = models.ManyToManyField(
        "Publisher",
        through="Publication",
        related_name="books",
    )

    class Meta:
        ordering = ["title"]

    def __str__(self):
        return self.title


class Publisher(models.Model):
    """Publisher entity for the book catalog."""

    name = models.CharField(max_length=200)
    country = models.CharField(max_length=100, blank=True)
    website = models.URLField(blank=True)

    class Meta:
        ordering = ["name"]

    def __str__(self):
        return self.name


class Category(models.Model):
    """Category entity used to classify books."""

    name = models.CharField(max_length=100)
    description = models.TextField(blank=True)

    class Meta:
        ordering = ["name"]
        verbose_name_plural = "categories"

    def __str__(self):
        return self.name


class AuthorProfile(models.Model):
    """One-to-one profile with biographical data separated from Author."""

    # OneToOneField: each author has exactly one profile and vice versa.
    author = models.OneToOneField(
        Author,
        on_delete=models.CASCADE,
        related_name="profile",
    )
    bio = models.TextField(blank=True)
    birth_date = models.DateField(null=True, blank=True)
    nationality = models.CharField(max_length=100, blank=True)
    photo = models.ImageField(upload_to="authors/", blank=True, null=True)

    def __str__(self):
        return f"Profile of {self.author}"


class Publication(models.Model):
    """Intermediate model for the Book-Publisher many-to-many relation.

    Stores extra data (publication_date and edition) that cannot live on the
    Book or Publisher models alone.
    """

    book = models.ForeignKey(
        Book,
        on_delete=models.CASCADE,
        related_name="publications",
    )
    publisher = models.ForeignKey(
        Publisher,
        on_delete=models.CASCADE,
        related_name="publications",
    )
    publication_date = models.DateField(default=timezone.now)
    edition = models.PositiveIntegerField(default=1)

    class Meta:
        ordering = ["book", "publication_date"]

    def __str__(self):
        return f"{self.book} - {self.publisher} (ed. {self.edition})"