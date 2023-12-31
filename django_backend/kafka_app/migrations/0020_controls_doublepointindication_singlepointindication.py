# Generated by Django 4.2.7 on 2023-12-11 07:53

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('kafka_app', '0019_delete_controls_delete_doublepointindication_and_more'),
    ]

    operations = [
        migrations.CreateModel(
            name='Controls',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('timestamp', models.CharField(max_length=50)),
                ('ioa', models.CharField(max_length=20)),
                ('value', models.CharField(max_length=20)),
            ],
        ),
        migrations.CreateModel(
            name='DoublePointIndication',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('timestamp', models.CharField(max_length=50)),
                ('ioa', models.CharField(max_length=20)),
                ('value', models.CharField(max_length=20)),
            ],
        ),
        migrations.CreateModel(
            name='SinglePointIndication',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('timestamp', models.CharField(max_length=50)),
                ('ioa', models.CharField(max_length=20)),
                ('value', models.CharField(max_length=20)),
            ],
        ),
    ]
