from pyramid.config import Configurator
from cos.models.Game import Games


def main(global_config, **settings):
    """ This function returns a Pyramid WSGI application.
    """
    config = Configurator(settings=settings)
    config.include('pyramid_jinja2')
    config.include('.models')
    config.include('.routes')
    config.registry.games = Games()
    config.scan()
    return config.make_wsgi_app()
