# Generated by Django 4.2.7 on 2023-12-07 06:36

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('kafka_app', '0007_alter_book_description'),
    ]

    operations = [
        migrations.AddField(
            model_name='book',
            name='CURRENT',
            field=models.CharField(default='0'),
        ),
        migrations.AddField(
            model_name='book',
            name='FREQ',
            field=models.CharField(default='0'),
        ),
        migrations.AddField(
            model_name='book',
            name='POW',
            field=models.CharField(default='0'),
        ),
        migrations.AddField(
            model_name='book',
            name='VOLTAGE',
            field=models.CharField(default='0'),
        ),
    ]