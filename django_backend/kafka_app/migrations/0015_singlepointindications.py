# Generated by Django 4.2.7 on 2023-12-11 07:11

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('kafka_app', '0014_delete_indications'),
    ]

    operations = [
        migrations.CreateModel(
            name='SinglePointIndications',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('a_10000', models.CharField(max_length=20)),
                ('a_10001', models.CharField(max_length=20)),
                ('a_10002', models.CharField(max_length=20)),
                ('a_10003', models.CharField(max_length=20)),
                ('a_10004', models.CharField(max_length=20)),
                ('a_10005', models.CharField(max_length=20)),
                ('a_10006', models.CharField(max_length=20)),
                ('a_10007', models.CharField(max_length=20)),
                ('a_10008', models.CharField(max_length=20)),
                ('a_10009', models.CharField(max_length=20)),
                ('a_10010', models.CharField(max_length=20)),
                ('a_10011', models.CharField(max_length=20)),
                ('a_10020', models.CharField(max_length=20)),
                ('a_10021', models.CharField(max_length=20)),
                ('a_10022', models.CharField(max_length=20)),
                ('a_10023', models.CharField(max_length=20)),
                ('a_10024', models.CharField(max_length=20)),
                ('a_10025', models.CharField(max_length=20)),
                ('a_10026', models.CharField(max_length=20)),
                ('a_10027', models.CharField(max_length=20)),
                ('a_10028', models.CharField(max_length=20)),
                ('a_10029', models.CharField(max_length=20)),
                ('a_10030', models.CharField(max_length=20)),
                ('a_10031', models.CharField(max_length=20)),
                ('a_10000_time', models.CharField(max_length=20)),
                ('a_10001_time', models.CharField(max_length=20)),
                ('a_10002_time', models.CharField(max_length=20)),
                ('a_10003_time', models.CharField(max_length=20)),
                ('a_10004_time', models.CharField(max_length=20)),
                ('a_10005_time', models.CharField(max_length=20)),
                ('a_10006_time', models.CharField(max_length=20)),
                ('a_10007_time', models.CharField(max_length=20)),
                ('a_10008_time', models.CharField(max_length=20)),
                ('a_10009_time', models.CharField(max_length=20)),
                ('a_10010_time', models.CharField(max_length=20)),
                ('a_10011_time', models.CharField(max_length=20)),
                ('a_10020_time', models.CharField(max_length=20)),
                ('a_10021_time', models.CharField(max_length=20)),
                ('a_10022_time', models.CharField(max_length=20)),
                ('a_10023_time', models.CharField(max_length=20)),
                ('a_10024_time', models.CharField(max_length=20)),
                ('a_10025_time', models.CharField(max_length=20)),
                ('a_10026_time', models.CharField(max_length=20)),
                ('a_10027_time', models.CharField(max_length=20)),
                ('a_10028_time', models.CharField(max_length=20)),
                ('a_10029_time', models.CharField(max_length=20)),
                ('a_10030_time', models.CharField(max_length=20)),
                ('a_10031_time', models.CharField(max_length=20)),
            ],
        ),
    ]