from datetime import datetime, timezone

from django.test import TestCase
from django.urls import reverse

from news.models import Article, Author, Category


class EmptyPortalTests(TestCase):
    def test_home_shows_empty_message(self):
        response = self.client.get(reverse("news:home"))
        self.assertEqual(response.status_code, 200)
        self.assertContains(response, "Todavía no hay noticias publicadas.")


class NewsPagesTests(TestCase):
    @classmethod
    def setUpTestData(cls):
        cls.author = Author.objects.create(name="Ana Writer", bio="Short bio")
        cls.tech = Category.objects.create(name="Tech")
        cls.health = Category.objects.create(name="Health")
        cls.empty = Category.objects.create(name="Empty")
        cls.old = Article.objects.create(
            title="Old article",
            summary="Old summary",
            body="Old body",
            author=cls.author,
            published_at=datetime(2026, 10, 1, 9, 0, tzinfo=timezone.utc),
        )
        cls.old.categories.add(cls.tech)
        cls.new = Article.objects.create(
            title="New article",
            summary=" ".join(["word"] * 40),
            body="New body",
            author=cls.author,
            published_at=datetime(2026, 10, 9, 9, 0, tzinfo=timezone.utc),
        )
        cls.new.categories.add(cls.tech, cls.health)

    def test_home_lists_newest_first_with_shared_templates(self):
        response = self.client.get(reverse("news:home"))
        self.assertEqual(
            list(response.context["articles"]), [self.new, self.old]
        )
        self.assertTemplateUsed(response, "base.html")
        self.assertTemplateUsed(response, "news/_article_card.html")
        self.assertContains(response, "09/10/2026")
        self.assertContains(response, "/static/css/news.css")

    def test_card_summary_is_cut_to_25_words(self):
        response = self.client.get(reverse("news:home"))
        self.assertContains(response, " ".join(["word"] * 25) + " …")
        self.assertNotContains(response, " ".join(["word"] * 26))

    def test_detail_shows_author_categories_and_body(self):
        response = self.client.get(
            reverse("news:article_detail", args=[self.new.pk])
        )
        self.assertEqual(response.status_code, 200)
        self.assertTemplateUsed(response, "news/article_detail.html")
        self.assertContains(response, "Ana Writer")
        self.assertContains(response, "Short bio")
        self.assertContains(response, "Tech")
        self.assertContains(response, "Health")
        self.assertContains(response, "New body")

    def test_missing_article_returns_404(self):
        response = self.client.get(reverse("news:article_detail", args=[999]))
        self.assertEqual(response.status_code, 404)

    def test_category_page_lists_only_its_articles(self):
        response = self.client.get(
            reverse("news:category", args=[self.health.pk])
        )
        self.assertEqual(list(response.context["articles"]), [self.new])
        self.assertTemplateUsed(response, "news/_article_card.html")

    def test_empty_category_shows_message(self):
        response = self.client.get(
            reverse("news:category", args=[self.empty.pk])
        )
        self.assertContains(
            response, "Todavía no hay noticias en esta categoría."
        )

    def test_sidebar_counts_articles_per_category(self):
        response = self.client.get(reverse("news:home"))
        counts = {
            category.name: category.article_count
            for category in response.context["categories"]
        }
        self.assertEqual(counts, {"Empty": 0, "Health": 1, "Tech": 2})

    def test_pages_link_to_each_other_with_named_urls(self):
        response = self.client.get(reverse("news:home"))
        self.assertContains(
            response, reverse("news:article_detail", args=[self.new.pk])
        )
        self.assertContains(
            response, reverse("news:category", args=[self.tech.pk])
        )
