from django.db import models

# Create your models here.
class MyDataModel(models.Model):
    platform = models.CharField(max_length=70)
    userId = models.IntegerField()
    sessionId = models.IntegerField()
    time = models.DecimalField(max_digits=20, decimal_places=0)
    date = models.CharField(max_length=70)
    interaction = models.CharField(max_length=70)
    sku = models.CharField(max_length=70)
    pageType = models.CharField(max_length=70)
