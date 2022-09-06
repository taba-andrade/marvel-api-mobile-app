from django.shortcuts import render, redirect
from django.http import HttpResponse, HttpResponseRedirect, JsonResponse
import environ
import requests
import json
import hashlib
import random

# Create your views here.


def compute_md5_hash(my_string):
    m = hashlib.md5()
    m.update(my_string.encode('utf-8'))
    return m.hexdigest()


def make_authorization(limit, offset):
    # Initialize environment variables
    env = environ.Env()

    publicKey = env('PUBLIC_KEY')
    privateKey = env('PRIVATE_KEY')
    ts = 1
    md5_hash = compute_md5_hash(f'{ts}{privateKey}{publicKey}')

    if offset == None:
        query_params = {
            'ts': {ts},
            'apikey': {publicKey},
            'hash': {md5_hash}
        }
        return query_params
    else:
        query_params = {
            'limit': {limit},
            'offset': {offset},
            'ts': {ts},
            'apikey': {publicKey},
            'hash': {md5_hash}
        }
        return query_params


def characterList(request):

    characters = []
    attributionText = []
    total = 1562  # total number of characters
    limit = 40

    if request.method == 'GET':

        offset = int(random.randint(0, total - 40))
        params = make_authorization(limit, offset)

        try:
            r = requests.get(
                "https://gateway.marvel.com/v1/public/characters?", params=params)
        except requests.exceptions.HTTPError as err:
            return SystemExit(err)

        attribution = r.json()['attributionText']
        response = r.json()['data']

        for value in response['results']:
            # adds only up to 20 characters and characters with available image
            # ignores charaters with url http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available

            if len(characters) <= 19 and 'image_not_available' not in value['thumbnail']['path']:
                characters.append(
                    {
                        "id": str(value['id']),
                        "name": value['name'],
                        "description": value['description'],
                        "thumbnail": {"path": value['thumbnail']['path'], "extension": value['thumbnail']['extension']},
                    }
                )

        attributionText.append(attribution)

    context = {'characters': characters,
               'attributionText': attributionText}

    return JsonResponse(context)


def characterSearch(request, keyword):

    characters = []
    attributionText = []

    params = make_authorization(limit=40, offset=None)

    url = f'https://gateway.marvel.com/v1/public/characters?nameStartsWith={keyword}&'

    try:
        r = requests.get(url, params)
    except requests.exceptions.HTTPError as err:
        return SystemExit(err)

    response = r.json()['data']
    attribution = r.json()['attributionText']

    for value in response['results']:
        # adds only up to 20 characters and characters with available image
        # ignores charaters with url http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available

        if len(characters) <= 19 and 'image_not_available' not in value['thumbnail']['path']:
            characters.append(
                {
                    "id": str(value['id']),
                    "name": value['name'],
                    "description": value['description'],
                    "thumbnail": {"path": value['thumbnail']['path'], "extension": value['thumbnail']['extension']},
                }
            )

    attributionText.append(attribution)

    context = {'characters': characters,
               'attributionText': attributionText}

    return JsonResponse(context)


def characterComics(request, id):

    comics = []

    params = make_authorization(limit=0, offset=None)

    url = f'https://gateway.marvel.com/v1/public/characters/{id}/comics?'

    try:
        r = requests.get(url, params)
    except requests.exceptions.HTTPError as err:
        return SystemExit(err)

    response = r.json()['data']

    for value in response['results']:
        # adds up to 20 comics with available image for the character
        # ignores charaters with url http://i.annihil.us/u/prod/marvel/i/mg/6/b0/image_not_available

        if len(comics) <= 19 and 'image_not_available' not in value['thumbnail']['path']:
            comics.append(
                {
                    "id": str(value['id']),
                    "title": value['title'],
                    "issueNumber": value['issueNumber'],
                    "description": value['description'],
                    "format": value['format'],
                    "pageCount": value['pageCount'],
                    "dates": {"type": value['dates'][0]['type'], "date": value['dates'][0]['date']},
                    "thumbnail": {"path": value['thumbnail']['path'], "extension": value['thumbnail']['extension']},
                    "prices": {"type": value['prices'][0]['type'], "price": value['prices'][0]['price']},
                    "urls": {"type": value['urls'][0]['type'], "url": value['urls'][0]['url']},
                }
            )

    context = {'comics': comics}

    return JsonResponse(context)


def home(request):

    return render(request, 'home.html')
