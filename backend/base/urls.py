from django.urls import path
from django.views.generic import TemplateView
from base import views

urlpatterns = [
    path('api/characters/', views.characterList, name='character-list'),
    path('api/comics/<int:id>/',
         views.characterComics, name='character-comics'),
    path('api/character-search/<str:keyword>/',
         views.characterSearch, name='character-search'),
]
