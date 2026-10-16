"""Queries behind the views. Part 2 of the lab happens in this file."""
from blog.models import Post


def posts_for_front_page():
    # The template reads `post.author` and `post.tags` for every post.
    # select_related joins the author in the same query (a ForeignKey, one
    # author per post); prefetch_related loads the tags of all the posts in a
    # second query (a ManyToMany, several tags per post). Two queries in total,
    # no matter how many posts there are.
    return (
        Post.objects.filter(published=True)
        .select_related("author")
        .prefetch_related("tags")
        .order_by("-published_at")
    )
