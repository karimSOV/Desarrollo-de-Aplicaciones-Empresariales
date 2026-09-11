from django.db import transaction
from django.http import HttpResponseRedirect
from django.shortcuts import get_object_or_404, render
from django.urls import reverse
from django.views.generic import DetailView, ListView

from .forms import ChoiceFormSet, QuestionForm
from .models import Exam, Question


class ExamListView(ListView):
    model = Exam
    template_name = 'quiz/exam_list.html'
    context_object_name = 'exams'


class ExamDetailView(DetailView):
    model = Exam
    template_name = 'quiz/exam_detail.html'
    context_object_name = 'exam'

    def get_queryset(self):
        return Exam.objects.prefetch_related('questions__choices')


def question_create(request, exam_pk):
    exam = get_object_or_404(Exam, pk=exam_pk)
    if request.method == 'POST':
        question_form = QuestionForm(request.POST)
        choice_formset = ChoiceFormSet(request.POST)
        if question_form.is_valid() and choice_formset.is_valid():
            with transaction.atomic():
                question = question_form.save(commit=False)
                question.exam = exam
                question.save()
                choice_formset.instance = question
                choice_formset.save()
            return HttpResponseRedirect(reverse('quiz:exam_detail', args=[exam.pk]))
    else:
        question_form = QuestionForm()
        choice_formset = ChoiceFormSet()
    context = {
        'exam': exam,
        'question_form': question_form,
        'choice_formset': choice_formset,
    }
    return render(request, 'quiz/question_create.html', context)