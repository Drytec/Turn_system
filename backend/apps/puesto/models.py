from django.db import models

from ..tipo.models import Types
from ..servicio.models import Service

class Place(models.Model):
    place_id = models.AutoField(primary_key=True)
    place_name = models.CharField(max_length=50)
    place_location = models.CharField(max_length=50)
    services = models.ManyToManyField(Service, through='PlaceService')
    type_id = models.ForeignKey(Types, on_delete=models.CASCADE,db_column='type_id')

    class Meta:
        db_table = "place"
        managed = False
    def __str__(self):
        return f'{self.place_name}'
class PlaceService(models.Model):
    id = models.AutoField(primary_key=True, db_column='ps_id')
    place = models.ForeignKey(Place, on_delete=models.CASCADE, db_column='place_id' )
    service = models.ForeignKey(Service, on_delete=models.CASCADE, db_column='service_id' )

    class Meta:
        db_table = 'place_service'
        managed = False
        unique_together = (('place', 'service'),)