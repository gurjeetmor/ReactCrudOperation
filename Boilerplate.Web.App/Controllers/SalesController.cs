using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Boilerplate.Web.App.Models;
using Microsoft.AspNetCore.Mvc;

namespace Boilerplate.Web.App.Controllers
{
    public class SalesController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
        public JsonResult GetData()
        {
            using (TalentContext db = new TalentContext())
            {
                var data = (from customer in db.Customer
                             join sales in db.Sales on customer.Id equals sales.CustomerId
                             join product in db.Product on sales.ProductId equals product.Id
                             join store in db.Store on sales.StoreId equals store.Id
                             select new {
                                 sales.Id,
                                 customerId=customer.Name,
                                 productId =product.Name,
                                 storeId =store.Name,
                                 sales.DateSold
                             }).ToArray();             
                return Json(data);
            }
        }       

    [HttpGet]
        public JsonResult CreateUpdate(Sales sales)
        {
            using (TalentContext db = new TalentContext())
            {
                if (sales.Id == 0)
                {
                    db.Sales.Add(sales);
                    db.SaveChanges();
                }
                else
                {
                    var salesData = db.Sales.Where(x => x.Id == sales.Id).FirstOrDefault();
                    salesData.DateSold = sales.DateSold;
                    salesData.ProductId = sales.ProductId;
                    salesData.CustomerId = sales.CustomerId;
                    salesData.StoreId = sales.StoreId;
                    db.SaveChanges();
                }
                return Json(new
                {
                    redirectUrl = Url.Action("Index", "Sales"),
                    isRedirect = true
                });
            }
            //return null;

        }

        [HttpPost]
        public JsonResult Delete(int id)
        {
            using (TalentContext db = new TalentContext())
            {
                var data = db.Sales.Where(x => x.Id == id).FirstOrDefault();
                db.Sales.Remove(data);
                db.SaveChanges();
            }
            return Json(new
            {
                redirectUrl = Url.Action("Index", "Sales"),
                isRedirect = true
            });
        }
    }
}