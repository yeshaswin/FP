from django.db import models
from django.contrib.auth.models import User

class Task(models.Model):
    uname=models.ForeignKey(User, on_delete=models.CASCADE)
    file=models.FileField(upload_to=("media"), blank=True, null=True)    
    def count(self):
        return self.objects.all().count()

