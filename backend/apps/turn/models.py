from tkinter import Place
from django.db import models
from ..place.models import Place
from ..user.models import User
from ..service.models import Service


# Create your models here.
class Turn(models.Model):
    turn_id = models.AutoField(primary_key=True)
    turn_num = models.IntegerField()
    active = models.BooleanField(default=True)
    attended_by = models.ForeignKey(User, on_delete=models.CASCADE, db_column='attended_by', null=True)
    owner = models.ForeignKey(User, on_delete=models.CASCADE, db_column='owner')
    service_id = models.ForeignKey(Service, on_delete=models.CASCADE, db_column='service_id')
    place_id = models.ForeignKey(Place, on_delete=models.CASCADE, db_column='place_id')
    date_created = models.DateTimeField(auto_now_add=True)
    date_closed = models.DateTimeField()

    class Meta:
        db_table = 'turn'
        managed = False
        
    def __str__(self):
        return f'{self.turn_num}'