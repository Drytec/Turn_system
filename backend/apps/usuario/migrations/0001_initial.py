# Generated by Django 5.1.7 on 2025-03-28 20:43

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Users',
            fields=[
                ('last_login', models.DateTimeField(blank=True, null=True, verbose_name='last login')),
                ('user_id', models.AutoField(primary_key=True, serialize=False)),
                ('email', models.EmailField(max_length=254, unique=True)),
                ('password', models.CharField(max_length=150)),
                ('username', models.CharField(max_length=150, unique=True)),
                ('name', models.CharField(max_length=150)),
                ('age', models.IntegerField(default=0)),
                ('conditions', models.BooleanField(default=False)),
                ('e_condition', models.CharField(default='Baja', max_length=150)),
                ('last_name', models.CharField(max_length=150)),
                ('is_staff', models.BooleanField(default=False)),
                ('is_active', models.BooleanField(default=True)),
                ('is_superuser', models.BooleanField(default=False)),
            ],
            options={
                'db_table': 'users',
                'managed': False,
            },
        ),
    ]
