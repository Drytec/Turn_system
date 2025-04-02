
import psycopg2

try:
    conn = psycopg2.connect(
        dbname="turn",
        user="postgres",
        password="aP4sw0rd",
        host="localhost",
        port="5432"
    )
    print("✅ Conexión exitosa")
    conn.close()
except Exception as e:
    print("❌ Error de conexión:", e)
