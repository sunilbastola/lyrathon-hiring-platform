from django.contrib import admin
from .models import Job, Applicant

@admin.register(Job)
class JobAdmin(admin.ModelAdmin):
    list_display = ('title', 'company', 'location', 'salary', 'created_at')
    search_fields = ('title', 'description', 'company__username')
    list_filter = ('location', 'created_at')

@admin.register(Applicant)
class ApplicantAdmin(admin.ModelAdmin):
    list_display = ('user', 'job', 'applied_at')
    search_fields = ('user__username', 'job__title')
    list_filter = ('applied_at',)