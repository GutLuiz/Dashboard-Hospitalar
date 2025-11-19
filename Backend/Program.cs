using Backend.Conexao;
using Backend.Services;

var builder = WebApplication.CreateBuilder(args);

var configuration = builder.Configuration;
ConexaoServico.Configurar(configuration);

builder.Services.AddControllers();
builder.Services.AddScoped<GeralService>();
builder.Services.AddScoped<MedicosService>();

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseAuthorization();
app.MapControllers();

app.Run();
