# Generated by Django 5.1.7 on 2025-03-28 20:43

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Turn',
            fields=[
                ('turn_id', models.AutoField(primary_key=True, serialize=False)),
                ('turn_num', models.IntegerField()),
            ],
            options={
                'db_table': 'turn',
                'managed': False,
            },
        ),
    ]
