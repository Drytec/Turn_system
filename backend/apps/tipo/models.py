from django.db import models


class Types (models.Model):
    type_id = models.AutoField(primary_key=True)
    type_rol = models.CharField(max_length=50)

    class Meta:
        db_table = "types"
        managed = False

    def __str__(self):
        return f'{self.type_rol}'
