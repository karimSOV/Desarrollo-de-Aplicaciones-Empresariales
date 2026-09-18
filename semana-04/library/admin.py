from django.contrib import admin

from .models import Author, AuthorProfile, Book, Category, Publication, Publisher


class AuthorProfileInline(admin.StackedInline):
    model = AuthorProfile
    extra = 0


class PublicationInline(admin.TabularInline):
    model = Publication
    extra = 1


@admin.register(Author)
class AuthorAdmin(admin.ModelAdmin):
    list_display = ("first_name", "last_name", "email")
    search_fields = ("first_name", "last_name")
    inlines = [AuthorProfileInline]


@admin.register(Book)
class BookAdmin(admin.ModelAdmin):
    list_display = ("title", "author", "publication_year", "price")
    list_filter = ("categories",)
    search_fields = ("title", "isbn")
    filter_horizontal = ("categories",)
    inlines = [PublicationInline]


@admin.register(Publisher)
class PublisherAdmin(admin.ModelAdmin):
    list_display = ("name", "country")


@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ("name",)


@admin.register(AuthorProfile)
class AuthorProfileAdmin(admin.ModelAdmin):
    list_display = ("author", "nationality", "birth_date")


@admin.register(Publication)
class PublicationAdmin(admin.ModelAdmin):
    list_display = ("book", "publisher", "publication_date", "edition")