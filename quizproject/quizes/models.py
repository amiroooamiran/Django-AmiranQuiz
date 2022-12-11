from django.db import models
import random

# Create your models here.

DIFF_CHOICE = (
    ('easy', 'easy'),
    ('medium', 'medium'),
    ('Hard', 'Hard'),
)

class Quiz(models.Model):
    name = models.CharField(max_length=120)
    topic = models.CharField(max_length=120)
    number_of_question = models.IntegerField()
    time = models.IntegerField(help_text='duration of the quiz minuts')
    required_sorce_to_pass = models.IntegerField(help_text='requird sourse to pass')
    dificluty = models.CharField(max_length=6, choices=DIFF_CHOICE)

    def __str__(self):
        return f"{self.name}-{self.topic}"

    def get_questions(self):
        question = list(self.question_set.all())
        random.shuffle(question)
        return question[:self.number_of_question]
    
    class Meta:
        verbose_name_plural = 'Quizes'
    