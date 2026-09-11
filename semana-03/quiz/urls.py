from django.urls import path

from . import views

app_name = 'quiz'

urlpatterns = [
    path('', views.ExamListView.as_view(), name='exam_list'),
    path('exams/<int:pk>/', views.ExamDetailView.as_view(), name='exam_detail'),
    path(
        'exams/<int:exam_pk>/questions/new/',
        views.question_create,
        name='question_create',
    ),
]