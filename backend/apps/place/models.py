from django.db import models
from ..service.models import Service


class Place(models.Model):
    place_id = models.AutoField(primary_key=True)
    service_id = models.ForeignKey(
        Service, on_delete=models.CASCADE, db_column='service_id')
    place_name = models.CharField(max_length=50, unique=True)

    class Meta:
        db_table = "place"
        managed = False

    def __str__(self):
        return self.place_name
