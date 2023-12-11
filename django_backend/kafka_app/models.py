from django.db import models


class Book(models.Model):
    status = models.CharField(max_length=50)
    received_at = models.DateTimeField(auto_now_add=True)
    description = models.CharField(default='QA1 Switched On : Location-Katugasthota')
    
    voltage=models.CharField(default='0')
    current=models.CharField(default='0')
    freq=models.CharField(default='0')
    pow=models.CharField(default='0')
    
    statusviewer = models.CharField(default='0')
    
class SinglePointIndication(models.Model):
    timestamp = models.CharField(max_length=50)
    ioa = models.CharField(max_length=20)
    value = models.CharField(max_length=20)

class DoublePointIndication(models.Model):
    timestamp = models.CharField(max_length=50)
    ioa = models.CharField(max_length=20)
    value = models.CharField(max_length=20)
    
class Controls(models.Model):
    timestamp = models.CharField(max_length=50)
    ioa = models.CharField(max_length=20)
    value = models.CharField(max_length=20)
    
class Measurements(models.Model):
    timestamp = models.CharField(max_length=50)
    ioa = models.CharField(max_length=20)
    value = models.CharField(max_length=20)

    def __str__(self):
        return self.timestamp
    