from django.db import models


class Book(models.Model):
    status = models.CharField(max_length=255)
    received_at = models.DateTimeField(auto_now_add=True)
