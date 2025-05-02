from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin


class Role(models.Model):
    role_id = models.AutoField(primary_key=True)
    role_name = models.CharField(max_length=50)

    class Meta:
        db_table = 'role'
        managed = False

    def __str__(self):
        return self.role_name


class UserManager(BaseUserManager):
    def _create_user(self, username, email, name, last_name, password, is_staff, is_superuser, **extra_fields):
        if not email:
            raise ValueError("El usuario debe tener un correo electrónico")
        email = self.normalize_email(email)
        user = self.model(
            username=username,
            email=email,
            name=name,
            last_name=last_name,
            is_staff=is_staff,
            is_active=True,
            is_superuser=is_superuser,
            **extra_fields
        )
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_user(self, username, email, name, last_name, password=None, **extra_fields):
        return self._create_user(username, email, name, last_name, password, is_staff=False, is_superuser=False, **extra_fields)

    def create_superuser(self, email, name, last_name, password=None, **extra_fields):
        return self._create_user(email, name, last_name, password, is_staff=True, is_superuser=True, **extra_fields)


class CustomUser(AbstractBaseUser):
    user_id = models.AutoField(primary_key=True)
    email = models.EmailField(unique=True)
    password = models.CharField(max_length=150)
    name = models.CharField(max_length=150)
    age = models.IntegerField(default=0)
    condition = models.BooleanField(default=False)
    role_id = models.ForeignKey(
        Role, on_delete=models.CASCADE, db_column='role_id')
    priority = models.CharField(max_length=150, default='Baja')
    last_name = models.CharField(max_length=150)
    is_staff = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)
    is_superuser = models.BooleanField(default=False)

    objects = UserManager()

    class Meta:
        db_table = 'customuser'
        managed = False

    USERNAME_FIELD = 'email'

    def get_full_name(self):
        return f'{self.name} {self.last_name}'

    def __str__(self):
        return f'{self.name} {self.last_name}'
