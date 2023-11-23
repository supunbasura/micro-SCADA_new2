from django.db import models


class Book(models.Model):
    status = models.CharField(max_length=50)
    received_at = models.DateTimeField(auto_now_add=True)
    description = models.CharField(default='QA1 Switched On : Location-Katugasthota')
