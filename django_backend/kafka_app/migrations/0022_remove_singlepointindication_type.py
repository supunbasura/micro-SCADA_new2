# Generated by Django 4.2.7 on 2023-12-11 09:28

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('kafka_app', '0021_singlepointindication_type'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='singlepointindication',
            name='type',
        ),
    ]