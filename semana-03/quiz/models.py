from django.db import models


class Exam(models.Model):
    title = models.CharField(max_length=200)
    description = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-created_at']
        verbose_name = 'exam'
        verbose_name_plural = 'exams'

    def __str__(self):
        return self.title


class Question(models.Model):
    exam = models.ForeignKey(Exam, on_delete=models.CASCADE, related_name='questions')
    text = models.TextField()
    score = models.IntegerField(default=1, help_text='Points awarded for a correct answer')

    class Meta:
        ordering = ['id']
        verbose_name = 'question'
        verbose_name_plural = 'questions'

    def __str__(self):
        return f'{self.exam.title} - {self.text[:50]}'


class Choice(models.Model):
    question = models.ForeignKey(Question, on_delete=models.CASCADE, related_name='choices')
    text = models.CharField(max_length=300)
    is_correct = models.BooleanField(default=False)

    class Meta:
        ordering = ['id']
        verbose_name = 'choice'
        verbose_name_plural = 'choices'

    def __str__(self):
        return self.text
