from django.db import models
from ..puesto.models import Place
class Service(models.Model):
    service_id = models.AutoField(primary_key=True)
    place_id = models.ForeignKey(Place, on_delete=models.CASCADE,db_column='place_id')
    service_type = models.CharField(max_length=50)
    service_description = models.TextField()

    class Meta:
        db_table = "service"
        managed = False
    def __str__(self):
        return f'{self.service_type}'
