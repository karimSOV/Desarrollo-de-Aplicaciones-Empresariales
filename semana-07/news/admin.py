from django.contrib import admin

from .models import Article, Author, Category


@admin.register(Article)
class ArticleAdmin(admin.ModelAdmin):
    list_display = ["title", "author", "published_at", "display_categories"]
    list_filter = ["categories", "author", "published_at"]
    search_fields = ["title", "summary", "author__name"]
    filter_horizontal = ["categories"]
    list_select_related = ["author"]
    date_hierarchy = "published_at"

    def get_queryset(self, request):
        return super().get_queryset(request).prefetch_related("categories")

    @admin.display(description="Categories")
    def display_categories(self, article):
        names = [category.name for category in article.categories.all()]
        return ", ".join(names)


@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ["name"]
    search_fields = ["name"]


@admin.register(Author)
class AuthorAdmin(admin.ModelAdmin):
    list_display = ["name"]
    search_fields = ["name"]
