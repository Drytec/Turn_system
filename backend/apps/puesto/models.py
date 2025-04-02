from django.db import models
from ..tipo.models import Types

class Place(models.Model):
    place_id = models.AutoField(primary_key=True)
    place_name = models.CharField(max_length=50)
    place_location = models.CharField(max_length=50)
    type_id = models.ForeignKey(Types, on_delete=models.CASCADE,db_column='type_id')

    class Meta:
        db_table = "place"
        managed = False
    def __str__(self):
        return f'{self.place_name}'
