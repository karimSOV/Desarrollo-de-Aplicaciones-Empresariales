from django.test import TestCase
from django.urls import reverse

from news.models import Article, Author, Category


class HtmlEscapingTests(TestCase):
    @classmethod
    def setUpTestData(cls):
        author = Author.objects.create(name="Test Author")
        category = Category.objects.create(name="Test Category")
        cls.article = Article.objects.create(
            title="Article with HTML",
            summary="<em>Summary</em> with a tag",
            body="<strong>Tip:</strong> <script>alert(1)</script>",
            author=author,
        )
        cls.article.categories.add(category)

    def test_detail_page_shows_body_tags_as_text(self):
        response = self.client.get(
            reverse("news:article_detail", args=[self.article.pk])
        )
        self.assertContains(response, "&lt;strong&gt;Tip:&lt;/strong&gt;")
        self.assertContains(response, "&lt;script&gt;alert(1)&lt;/script&gt;")
        self.assertNotContains(response, "<strong>Tip:</strong>")
        self.assertNotContains(response, "<script>alert(1)</script>")

    def test_home_card_shows_summary_tags_as_text(self):
        response = self.client.get(reverse("news:home"))
        self.assertContains(response, "&lt;em&gt;Summary&lt;/em&gt;")
        self.assertNotContains(response, "<em>Summary</em>")
