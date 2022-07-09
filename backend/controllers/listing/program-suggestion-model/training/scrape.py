# Task: Scape activities from giving.sg and save it to csv file
# This isn't illegal... right?
from selenium import webdriver
from selenium.webdriver.common.by import By
import time, csv

URL1 = "https://www.giving.sg/search?type=volunteer"
URL1_tab_loc = ".card--flex.card .card__link"
URL2_title_loc = '//meta[contains(@property,"title")]'
URL2_desc_loc = '//meta[contains(@property,"description")]'
URL2_categories_loc = '//*[@class="accordion-card"][descendant::*[contains(text(),"SUPPORTED CAUSES")]]//*[@class="accordion-card__body"]'

driver = webdriver.Chrome('chromedriver.exe')
driver.get(URL1)
SCROLL_PAUSE_TIME = 7

# Get scroll height
last_height = driver.execute_script("return document.body.scrollHeight")

while True:
    # Scroll down to bottom
    driver.execute_script("window.scrollTo(0, document.body.scrollHeight);")

    # Wait to load page
    time.sleep(SCROLL_PAUSE_TIME)

    # Calculate new scroll height and compare with last scroll height
    new_height = driver.execute_script("return document.body.scrollHeight")
    if new_height == last_height:
        break
    last_height = new_height

elems = driver.find_elements(By.CSS_SELECTOR, URL1_tab_loc)
URLS = [e.get_attribute('href') for e in elems]
print("URLS", URLS[:3])
print("NUMBER OF URLS", len(URLS))

data = []
skipped = 0
for url in URLS:
    try:
        driver.get(url)
        title = driver.find_element(By.XPATH, URL2_title_loc)
        title = title.get_attribute("content")
        desc = driver.find_element(By.XPATH, URL2_desc_loc)
        desc = desc.get_attribute("content")
        # categories not implemented
        if desc == "":
            continue
        data.append([title, desc])
        with open('dataset.csv', 'w', newline='') as f:
            new = f.read()
            writer = csv.writer(f)
            writer.writerows(data)
    except:
        skipped += 1
        print("NUMBER OF SKIPPED URLS", skipped)
        continue

print("DATA", data[0])

with open('dataset.csv', 'w', newline='') as f:
    writer = csv.writer(f)
    writer.writerows(data)


