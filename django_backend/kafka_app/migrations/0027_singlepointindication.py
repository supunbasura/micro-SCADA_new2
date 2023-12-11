# Generated by Django 4.2.7 on 2023-12-11 12:08

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('kafka_app', '0026_delete_singlepointindication'),
    ]

    operations = [
        migrations.CreateModel(
            name='SinglePointIndication',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('timestamp', models.CharField(max_length=50)),
                ('ioa', models.CharField(max_length=20)),
                ('value', models.CharField(max_length=20)),
                ('description', models.CharField(default='Description')),
            ],
        ),
    ]
