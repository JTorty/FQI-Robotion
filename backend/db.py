import psycopg2

conn = psycopg2.connect(database="Robotion",
                        host="localhost",
                        user="postgres",
                        password="password",
                        port="5432")

cursor = conn.cursor()

cursor.execute("SELECT * FROM robots")

result = cursor.fetchall()

for item in result:
    for value in item:
        print (value)
        


