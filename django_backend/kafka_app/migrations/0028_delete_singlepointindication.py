# Generated by Django 4.2.7 on 2023-12-11 12:19

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('kafka_app', '0027_singlepointindication'),
    ]

    operations = [
        migrations.DeleteModel(
            name='SinglePointIndication',
        ),
    ]