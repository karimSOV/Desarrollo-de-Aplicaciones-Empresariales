from django.urls import path

from . import views


app_name = "news"

urlpatterns = [
    path("", views.home, name="home"),
    path("articles/<int:pk>/", views.article_detail, name="article_detail"),
    path("categories/<int:pk>/", views.category_articles, name="category"),
]
