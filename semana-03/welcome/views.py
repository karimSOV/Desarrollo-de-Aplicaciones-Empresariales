from django.shortcuts import render

NOMBRE = "Karim Sovero"


def index(request):
    context = {
        "nombre": NOMBRE,
        "titulo": "Desarrollo de Aplicaciones Empresariales",
    }
    return render(request, "welcome/index.html", context)