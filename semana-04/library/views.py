from django.shortcuts import get_object_or_404, render

from .models import Book


def book_detail(request, book_id):
    """Render the detail page of a single book."""
    book = get_object_or_404(Book, pk=book_id)
    return render(request, "library/book_detail.html", {"book": book})