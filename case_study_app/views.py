from rest_framework import viewsets
from case_study_app.models import MyDataModel
from case_study_app.serializers import MyModelSerializer
from rest_framework.response import Response
from rest_framework.decorators import api_view
# Create your views here.


@api_view(['GET'])
def get_data(request):
    my_data = MyDataModel.objects.all()

    dates_data = {}
    my_dates = list(MyDataModel.objects.values_list(
        'date', flat=True).distinct())

    for i in my_dates:
        impression_interaction = my_data.filter(
            date=i).filter(interaction="impression").count()
        transaction_interaction = my_data.filter(
            date=i).filter(interaction="transaction").count()
        add_to_cart_interaction = my_data.filter(
            date=i).filter(interaction="add_to_cart").count()
        click_interaction = my_data.filter(
            date=i).filter(interaction="click").count()
        view_interaction = my_data.filter(
            date=i).filter(interaction="view").count()
        my_list = [impression_interaction, transaction_interaction,
                   add_to_cart_interaction, click_interaction, view_interaction]
        k = str(i)
        dates_data[k] = list()
        dates_data[k].extend(my_list)

    breakdown = list(MyDataModel.objects.values(
        'platform', 'pageType').distinct())
    breakdown_list = []
    for i in breakdown:
        inner_list = []
        total_users = my_data.filter(platform=i['platform']).filter(
            pageType=i['pageType']).count()
        impressions = my_data.filter(platform=i['platform']).filter(
            pageType=i['pageType']).filter(interaction="impression").count()
        clicks = my_data.filter(platform=i['platform']).filter(
            pageType=i['pageType']).filter(interaction="click").count()
        add_to_cart = my_data.filter(platform=i['platform']).filter(
            pageType=i['pageType']).filter(interaction="add_to_cart").count()
        transactions = my_data.filter(platform=i['platform']).filter(
            pageType=i['pageType']).filter(interaction="transaction").count()
        inner_list = [i['platform'], i['pageType'], total_users,
                      impressions, clicks, add_to_cart, transactions]
        breakdown_list.append(inner_list)
    platform = request.GET.get('platform')
    if platform:
        my_data = my_data.filter(platform=platform)
    pageType = request.GET.get('pageType')
    if pageType:
        my_data = my_data.filter(pageType=pageType)
    sku = request.GET.get('sku')
    if sku:
        my_data = my_data.filter(sku=sku)
    userId = request.GET.get('userId')
    date = request.GET.get('date')
    if date:
        date = str(date)
        my_data = my_data.filter(date=date)
    if userId:
        my_data = my_data.filter(userId=userId)
    app_platform = my_data.filter(platform="app").count()
    mobile_platform = my_data.filter(platform="mobile").count()
    desktop_platform = my_data.filter(platform="desktop").count()
    all_platform = app_platform + mobile_platform + desktop_platform
    app_platform_perc = (app_platform / all_platform) * 100
    mobile_platform_perc = (mobile_platform / all_platform) * 100
    desktop_platform_perc = (desktop_platform / all_platform) * 100
    browsing_pageType = my_data.filter(pageType="browsing").count()
    search_pageType = my_data.filter(pageType="search").count()
    all_pageType = browsing_pageType + search_pageType
    browsing_pageType_perc = (browsing_pageType / all_pageType) * 100
    search_pageType_perc = (search_pageType / all_pageType) * 100
    impression_interaction = my_data.filter(interaction="impression").count()
    transaction_interaction = my_data.filter(interaction="transaction").count()
    add_to_cart_interaction = my_data.filter(interaction="add_to_cart").count()
    click_interaction = my_data.filter(interaction="click").count()
    view_interaction = my_data.filter(interaction="view").count()
    all_interactions = impression_interaction + transaction_interaction + \
        add_to_cart_interaction + click_interaction + view_interaction
    impression_interaction_perc = (
        impression_interaction / all_interactions) * 100
    transaction_interaction_perc = (
        transaction_interaction / all_interactions) * 100
    add_to_cart_interaction_perc = (
        add_to_cart_interaction / all_interactions) * 100
    click_interaction_perc = (click_interaction / all_interactions) * 100
    view_interaction_perc = (view_interaction / all_interactions) * 100
    response = Response()
    print(view_interaction_perc)
    print("Hello")
    #serializer = MyModelSerializer(my_data, many=True)
    response.data = {'dates_data': dates_data, 'breakdown_list': breakdown_list, 'app_platform': app_platform_perc, "mobile_platform": mobile_platform_perc,
                     "desktop_platform": desktop_platform_perc, "browsing_pageType": browsing_pageType_perc,
                     "search_pageType": search_pageType_perc, "impression_interaction": impression_interaction_perc,
                     "transaction_interaction": transaction_interaction_perc,
                     "add_to_cart_interaction": add_to_cart_interaction_perc, "click_interaction": click_interaction_perc,
                     "view_interaction": view_interaction_perc,
                     }
    return response

