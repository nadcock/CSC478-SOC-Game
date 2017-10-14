from pyramid.view import view_config


@view_config(route_name='home', renderer='templates/game.jinja2')
def my_view(request):
    return {'project': 'Catan Board'}


# @view_config(route_name='generate_ajax_data', renderer='json')
# def my_ajax_view(request):
#     return {'message': 'Hello World'}
