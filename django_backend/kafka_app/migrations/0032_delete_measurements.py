# Generated by Django 4.2.7 on 2023-12-14 08:10

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('kafka_app', '0031_controls_doublepointindication'),
    ]

    operations = [
        migrations.DeleteModel(
            name='Measurements',
        ),
    ]
