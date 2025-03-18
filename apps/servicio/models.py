from django.db import models


class Service(models.Model):
    service_id = models.AutoField(primary_key=True)
    type_service = models.CharField(max_length=50)
    description_service = models.TextField()

    class Meta:
        db_table = "service"
        managed = False
    def __str__(self):
        return f'{self.type_service}'
