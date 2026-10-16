from django.db import models
from django.utils import timezone


class Category(models.Model):
    name = models.CharField(max_length=100, unique=True)

    class Meta:
        ordering = ["name"]
        verbose_name = "category"
        verbose_name_plural = "categories"

    def __str__(self):
        return self.name


class Author(models.Model):
    name = models.CharField(max_length=150)
    bio = models.TextField(blank=True)

    class Meta:
        ordering = ["name"]
        verbose_name = "author"
        verbose_name_plural = "authors"

    def __str__(self):
        return self.name


class Article(models.Model):
    title = models.CharField(max_length=200)
    summary = models.TextField()
    body = models.TextField()
    image = models.ImageField(upload_to="articles/", blank=True)
    published_at = models.DateTimeField(default=timezone.now)
    author = models.ForeignKey(
        Author,
        on_delete=models.PROTECT,
        related_name="articles",
    )
    categories = models.ManyToManyField(Category, related_name="articles")

    class Meta:
        ordering = ["-published_at", "-pk"]
        verbose_name = "article"
        verbose_name_plural = "articles"

    def __str__(self):
        return self.title
