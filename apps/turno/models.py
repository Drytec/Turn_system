from tkinter import Place
from django.db import models
from ..puesto.models import Place
from ..usuario.models import Users
from ..servicio.models import Service
# Create your models here.
class Turn(models.Model):
    turn_id = models.AutoField(primary_key=True)
    turn_num = models.IntegerField()
    user_id = models.ForeignKey(Users, on_delete=models.CASCADE,db_column='user_id')
    service_id = models.ForeignKey(Service, on_delete=models.CASCADE,db_column='service_id')
    place_id = models.ForeignKey(Place, on_delete=models.CASCADE,db_column='place_id')

    class Meta:
        db_table = 'turn'
        managed = False
    def __str__(self):
        return f'{self.turn_num}'