from django.db.models import Count
from django.shortcuts import get_object_or_404, render

from .models import Article, Category


def sidebar_categories():
    return Category.objects.annotate(article_count=Count("articles"))


def article_queryset():
    return Article.objects.select_related("author").prefetch_related(
        "categories"
    )


def home(request):
    return render(
        request,
        "news/home.html",
        {
            "articles": article_queryset(),
            "categories": sidebar_categories(),
        },
    )


def article_detail(request, pk):
    article = get_object_or_404(article_queryset(), pk=pk)
    return render(
        request,
        "news/article_detail.html",
        {"article": article, "categories": sidebar_categories()},
    )


def category_articles(request, pk):
    category = get_object_or_404(Category, pk=pk)
    return render(
        request,
        "news/category.html",
        {
            "category": category,
            "articles": article_queryset().filter(categories=category),
            "categories": sidebar_categories(),
        },
    )
