from django import forms
from django.forms import BaseFormSet, BaseInlineFormSet, inlineformset_factory

from .models import Choice, Exam, Question


class ExamForm(forms.ModelForm):
    class Meta:
        model = Exam
        fields = ['title', 'description']


class QuestionForm(forms.ModelForm):
    class Meta:
        model = Question
        fields = ['text']


class ChoiceForm(forms.ModelForm):
    class Meta:
        model = Choice
        fields = ['text', 'is_correct']


class BaseChoiceFormSet(BaseInlineFormSet):
    default_error_messages = {
        **BaseFormSet.default_error_messages,
        'too_few_forms': 'Please provide at least %(num)d choices for this question.',
    }

    def clean(self):
        super().clean()
        correct_count = 0
        for form in self.forms:
            if not form.is_valid():
                continue
            data = form.cleaned_data
            if data.get('DELETE') or data.get('id') is None and not data:
                continue
            if data.get('is_correct'):
                correct_count += 1
        if correct_count != 1:
            raise forms.ValidationError(
                'Exactly one choice must be marked as correct.'
            )


ChoiceFormSet = inlineformset_factory(
    Question,
    Choice,
    form=ChoiceForm,
    formset=BaseChoiceFormSet,
    fields=['text', 'is_correct'],
    extra=4,
    can_delete=True,
    min_num=2,
    validate_min=True,
)