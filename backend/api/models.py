from django.db import models

# Create your models here.

class Node(models.Model):
    name=models.CharField(max_length=50)
    parent=models.ForeignKey('self',on_delete=models.CASCADE,null=True,related_name='children')

    def __str__(self):
        return f"name:{self.name} and parent : {self.parent}"